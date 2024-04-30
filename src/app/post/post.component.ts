import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIconComponent],

  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  digimon: any;
  postContent: string = '';
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (history.state && history.state.data) {
      this.digimon = history.state.data;

      const savedPosts = localStorage.getItem(this.digimon.name);
      if (savedPosts) {
        this.digimon.posts = JSON.parse(savedPosts);
      }
    } else {
      console.error("Os dados do histórico não estão disponíveis.");
    }
  }


  submitPost() {
    if (this.postContent.trim() === '') {
      alert("Não é possível postar um comentário vazio.");
      return; 
    }
  
    if (!this.digimon.posts) {
      this.digimon.posts = [];
    }
  
    this.digimon.posts.push({ content: this.postContent, newContent: '', editing: false });
  
    localStorage.setItem(this.digimon.name, JSON.stringify(this.digimon.posts));
  
    this.postContent = '';
  }

  removePost(index: number) {
    this.digimon.posts.splice(index, 1);

    localStorage.setItem(this.digimon.name, JSON.stringify(this.digimon.posts));
  }

  editPost(index: number) {
    this.digimon.posts[index].newContent = this.digimon.posts[index].content;
    this.digimon.posts[index].editing = true;
  }

  savePost(index: number) {
    this.digimon.posts[index].content = this.digimon.posts[index].newContent;
    this.digimon.posts[index].editing = false;

    localStorage.setItem(this.digimon.name, JSON.stringify(this.digimon.posts));
  }
}