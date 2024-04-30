import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIconComponent],

  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  newPost: string = '';
  posts: { content: string, createdAt: Date, liked: boolean ,editing?: boolean }[] = [];
  editingIndex: number | null = null;

  constructor() { }

  onSubmit() {
    if (this.newPost.trim() !== '') {
      const post = {
        content: this.newPost,
        createdAt: new Date(),
        liked: false
      };

      if (this.editingIndex !== null) {
        // Estamos editando um post existente
        this.posts[this.editingIndex] = post;
        this.editingIndex = null;
      } else {
        // Estamos criando um novo post
        this.posts.push(post);
      }

      localStorage.setItem('posts', JSON.stringify(this.posts));
      this.newPost = '';
    }
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const storedPosts = localStorage.getItem('posts');
      if (storedPosts) {
        this.posts = JSON.parse(storedPosts);
      }
    } else {
      console.error('localStorage is not available.');
    }
  }

  removePost(index: number) {
    this.posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }

  toggleLike(index: number) {
    this.posts[index].liked = !this.posts[index].liked;
  }

  editPost(index: number) {
    this.posts[index].editing = true;
  }

  savePost(index: number) {
    this.posts[index].editing = false;
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }


}
