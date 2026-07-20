import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div class="skeleton-wrapper">
      <!-- Cover Shimmer -->
      <div class="shimmer cover-skeleton"></div>

      <!-- Info Area -->
      <div class="info-skeleton">
        <div class="shimmer logo-skeleton"></div>
        <div class="shimmer title-skeleton"></div>
        <div class="shimmer desc-skeleton-line"></div>
        <div class="shimmer desc-skeleton-line short"></div>
      </div>

      <!-- Categories Row -->
      <div class="categories-skeleton-row">
        @for (item of [1, 2, 3, 4]; track item) {
          <div class="shimmer chip-skeleton"></div>
        }
      </div>

      <!-- Menu Items -->
      <div class="items-skeleton-cols">
        @for (card of [1, 2, 3, 4]; track card) {
          <div class="item-card-skeleton">
            <div class="shimmer item-img-skeleton"></div>
            <div class="item-details-skeleton">
              <div class="shimmer item-title-skeleton"></div>
              <div class="shimmer item-desc-skeleton"></div>
              <div class="shimmer item-desc-skeleton short"></div>
              <div class="item-footer-skeleton">
                <div class="shimmer item-price-skeleton"></div>
              </div>
            </div>
          </div>
        }
      </div>

    </div>
  `,
  styles: [`
    .skeleton-wrapper {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background: var(--bg-primary);
      min-height: 100vh;
      box-sizing: border-box;
      padding-bottom: 2rem;
    }

    .shimmer {
      background: linear-gradient(
        90deg,
        var(--bg-skeleton) 25%,
        var(--shimmer-hover) 37%,
        var(--bg-skeleton) 63%
      );
      background-size: 400% 100%;
      animation: skeleton-loading 1.4s ease infinite;
    }

    @keyframes skeleton-loading {
      0% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    .cover-skeleton {
      width: 100%;
      height: clamp(160px, 25vh, 220px);
      border-radius: 0 0 24px 24px;
    }

    .info-skeleton {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 1.5rem;
      margin-top: -50px;
      margin-bottom: 2rem;
      box-sizing: border-box;
    }

    .logo-skeleton {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: 4px solid var(--bg-primary);
      box-shadow: var(--shadow-sm);
      margin-bottom: 1rem;
    }

    .title-skeleton {
      width: 160px;
      height: 24px;
      border-radius: 6px;
      margin-bottom: 0.75rem;
    }

    .desc-skeleton-line {
      width: 80%;
      height: 12px;
      border-radius: 4px;
      margin-bottom: 0.5rem;

      &.short {
        width: 50%;
      }
    }

    .categories-skeleton-row {
      display: flex;
      gap: 0.75rem;
      padding: 0 1.5rem;
      overflow-x: auto;
      margin-bottom: 2rem;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .chip-skeleton {
      flex: 0 0 90px;
      height: 38px;
      border-radius: 20px;
    }

    .items-skeleton-cols {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      padding: 0 1.5rem;
    }

    .item-card-skeleton {
      display: flex;
      background: var(--bg-secondary);
      border-radius: 16px;
      padding: 0.75rem;
      gap: 1rem;
      align-items: center;
    }

    .item-img-skeleton {
      width: 90px;
      height: 90px;
      border-radius: 12px;
      flex-shrink: 0;
    }

    .item-details-skeleton {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 0.5rem;
    }

    .item-title-skeleton {
      width: 120px;
      height: 16px;
      border-radius: 4px;
    }

    .item-desc-skeleton {
      width: 100%;
      height: 10px;
      border-radius: 3px;

      &.short {
        width: 60%;
      }
    }

    .item-footer-skeleton {
      display: flex;
      justify-content: space-between;
      margin-top: 0.25rem;
    }

    .item-price-skeleton {
      width: 60px;
      height: 16px;
      border-radius: 4px;
    }
  `],
  imports: [] // Note: NgFor or custom ngFor can be simulated or we can just import CommonModule
})
export class SkeletonComponent {}
