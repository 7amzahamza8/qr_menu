import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="error-container">
      <div class="error-card">
        <div class="error-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        
        <h1 class="error-title-ar">المعذرة، الصفحة غير موجودة</h1>
        <p class="error-desc-ar">لم نتمكن من العثور على قائمة الطعام الخاصة بهذا المطعم بشكل صحيح. يرجى التحقق من الرابط.</p>

        <h1 class="error-title-en">Menu Not Found</h1>
        <p class="error-desc-en">We couldn't load the menu for this restaurant. Please double check the QR code or dynamic URL link.</p>

        <a routerLink="/menu/alsham" class="action-btn">
          <span>الذهاب للمطعم الافتراضي</span>
          <span style="font-weight: 300; opacity: 0.8; margin: 0 4px;">|</span>
          <span>Go to Demo Menu</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: var(--bg-primary);
      padding: 1.5rem;
      box-sizing: border-box;
      font-family: 'Cairo', 'Tajawal', sans-serif;
    }

    .error-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 2.5rem 2rem;
      max-width: 500px;
      width: 100%;
      text-align: center;
      box-shadow: var(--shadow-lg);
      backdrop-filter: blur(10px);
      animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .error-icon {
      color: var(--status-unavailable-text);
      background: color-mix(in srgb, var(--status-unavailable-text) 10%, transparent);
      width: 96px;
      height: 96px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 2rem;
      box-shadow: 0 8px 16px rgba(0,0,0,0.06);
    }

    h1 {
      font-size: 1.5rem;
      margin: 0;
      color: var(--text-primary);
      font-weight: 700;
    }

    .error-title-ar {
      margin-bottom: 0.5rem;
      direction: rtl;
    }

    .error-title-en {
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      font-family: 'Outfit', sans-serif;
    }

    p {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0 0 1rem;
    }

    .error-desc-ar {
      direction: rtl;
    }

    .error-desc-en {
      font-family: 'Outfit', sans-serif;
      margin-bottom: 2rem;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: var(--accent-primary);
      color: white;
      text-decoration: none;
      padding: 1rem 1.75rem;
      border-radius: 14px;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px color-mix(in srgb, var(--accent-primary) 30%, transparent);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px color-mix(in srgb, var(--accent-primary) 40%, transparent);
      }

      &:active {
        transform: translateY(0);
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class ErrorComponent {}
