import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import {
  COLLECTION_CATEGORIES,
  COLLECTION_ITEMS,
  CollectionItem,
  StoneCategory,
  getCategory,
  getItemsByCategory
} from '../../data/collections.catalog';

@Component({
  selector: 'app-collections-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './collections-page.component.html',
  styleUrl: './collections-page.component.scss'
})
export class CollectionsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly categories = COLLECTION_CATEGORIES;
  activeCategory: StoneCategory | null = null;
  items: CollectionItem[] = COLLECTION_ITEMS;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const cat = params.get('category') as StoneCategory | null;
      if (cat && getCategory(cat)) {
        this.activeCategory = cat;
        this.items = getItemsByCategory(cat);
      } else {
        this.activeCategory = null;
        this.items = COLLECTION_ITEMS;
      }
    });
  }

  categoryLabel(id: StoneCategory): string {
    return getCategory(id)?.label ?? id;
  }
}
