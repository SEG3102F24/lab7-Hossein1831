import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/books/model/book';
import { Subscription } from 'rxjs';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor!: Author | null;
  private subscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorsService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.subscription = this.authorService.getAuthorsInfo(id).subscribe({
        next: (data: Author) => {
          this.selectedAuthor = data;
        },
        error: (_: any) => {
          this.selectedAuthor = null;
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
