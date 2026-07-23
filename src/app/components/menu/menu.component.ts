import { Component, input, signal, computed, inject, OnInit, OnDestroy, effect, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { RestaurantMenu } from '../../interfaces/menu.interface';
import { Router, RouterModule } from '@angular/router';
import { SkeletonComponent } from '../shared/skeleton.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ CommonModule,

    RouterModule,

    SkeletonComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, OnDestroy {
  // Input binding for 'restaurantId' parameter from router
  readonly restaurantId = input<string>();

  private readonly menuService = inject(MenuService);
  private readonly router = inject(Router);
  private readonly el = inject(ElementRef);

  // States
  readonly menu = signal<RestaurantMenu | null>(null);
  readonly loading = signal<boolean>(true);
  readonly searchQuery = signal<string>('');
  readonly activeCategory = signal<string>('');
  readonly isDark = signal<boolean>(false);
  readonly lang = signal<'ar' | 'en'>('ar');

  // Computed phone links
  readonly whatsappUrl = computed(() => {
    const rawMenu = this.menu();
    if (!rawMenu || !rawMenu.restaurant.phone) {
      return '';
    }
    const cleanPhone = rawMenu.restaurant.phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}`;
  });

  readonly callUrl = computed(() => {
    const rawMenu = this.menu();
    return rawMenu?.restaurant?.phone ? `tel:${rawMenu.restaurant.phone}` : '';
  });

  private observer?: IntersectionObserver;


  // Localized string dictionary
  readonly translations = {
    ar: {
      searchPlaceholder: 'ابحث عن وجبتك المفضلة...',
      call: 'اتصال',
      whatsapp: 'واتساب',
      location: 'الموقع',
      unavailable: 'غير متوفر',
      noItemsFound: 'لم يتم العثور على وجبات مطابقة للبحث.',
      address: 'العنوان'
    },
    en: {
      searchPlaceholder: 'Search your favorite dish...',
      call: 'Call',
      whatsapp: 'WhatsApp',
      location: 'Location',
      unavailable: 'Unavailable',
      noItemsFound: 'No items match your search.',
      address: 'Address'
    }
  };

  constructor() {
    // Watch restaurantId input and load menu accordingly
    effect(() => {
      const id = this.restaurantId();
      if (id) {
        this.loadRestaurantMenu(id);
      } else {
        // Redirect to a default menu if parameter is missing
        this.router.navigate(['/menu/alsham']);
      }
    });

    // Watch filteredCategories and reset scroll spy after rendering
    effect(() => {
      const currentMenu = this.menu();
      if (currentMenu) {
        // Wait minor tick to allow DOM rendering before attaching observer
        setTimeout(() => this.setupScrollObserver(), 250);
      }
    });
  }

  ngOnInit() {
    // Initialize Theme from LocalStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.isDark.set(true);
      document.body.classList.add('dark-theme');
    } else {
      this.isDark.set(false);
      document.body.classList.remove('dark-theme');
    }

    // Initialize Dir directionality
    document.body.dir = this.lang() === 'ar' ? 'rtl' : 'ltr';
    document.body.lang = this.lang();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private loadRestaurantMenu(id: string) {
    this.loading.set(true);
    this.menuService.getMenu(id).subscribe({
      next: (data) => {
        this.menu.set(data);
        this.loading.set(false);
        if (data.categories && data.categories.length > 0) {
          this.activeCategory.set(data.categories[0].name);
        }
      },
      error: (err) => {
        console.error('Menu load failed:', err);
        // Navigate to error page if file is not found
        this.router.navigate(['/error']);
      }
    });
  }

  // Reactive Menu Listing filtered by Search Query
  readonly filteredCategories = computed(() => {
    const rawMenu = this.menu();
    if (!rawMenu) return [];
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) {
      return rawMenu.categories;
    }
    return rawMenu.categories.map(cat => {
      const matchingItems = cat.items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        (item.description && item.description.toLowerCase().includes(query))
      );
      return {
        ...cat,
        items: matchingItems
      };
    }).filter(cat => cat.items.length > 0);
  });

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  toggleDarkMode() {
    this.isDark.update(d => !d);
    if (this.isDark()) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleLanguage() {
    this.lang.update(l => l === 'ar' ? 'en' : 'ar');
    document.body.dir = this.lang() === 'ar' ? 'rtl' : 'ltr';
    document.body.lang = this.lang();
    // Refresh Scroll Observation since UI layout flow will shift direction
    setTimeout(() => this.setupScrollObserver(), 300);
  }

  scrollToCategory(categoryId: string) {
    const sectionElement = document.getElementById(categoryId);
    if (sectionElement) {
      // Offset scrolling by sticky navigation height (roughly 140px)
      const offset = 130;
      const elementPosition = sectionElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      this.activeCategory.set(categoryId);
    }
  }

  private setupScrollObserver() {
    if (this.observer) {
      this.observer.disconnect();
    }

    const options = {
      root: null,
      rootMargin: '-140px 0px -50% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            this.activeCategory.set(id);
            const activeTab = document.getElementById('tab-' + id);
            if (activeTab) {
              activeTab.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
              });
            }
          }
        }
      });
    }, options);

    const sections = this.el.nativeElement.querySelectorAll('.category-section');
    sections.forEach((sect: Element) => this.observer?.observe(sect));
  }
}
