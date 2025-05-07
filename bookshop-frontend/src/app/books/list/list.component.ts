import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  searchTerm: string = '';
  sortField: string = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';
  loading = true;
  error = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading books.';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = this.books;
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
      );
    }
    filtered = filtered.sort((a, b) => {
      const aField = (a[this.sortField] || '').toLowerCase();
      const bField = (b[this.sortField] || '').toLowerCase();
      if (aField < bField) return this.sortDirection === 'asc' ? -1 : 1;
      if (aField > bField) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    this.filteredBooks = filtered;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onSortChange(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }
}
