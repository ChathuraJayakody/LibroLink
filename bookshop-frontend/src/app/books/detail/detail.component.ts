import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  book: any;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(id).subscribe({
        next: (data) => {
          this.book = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Book not found.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'No book ID provided.';
      this.loading = false;
    }
  }
}
