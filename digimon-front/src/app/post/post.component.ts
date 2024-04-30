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
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    if (history.state && history.state.data) {
      this.digimon = history.state.data;
  
      // Carrega os posts do localStorage, se houver
      const savedPosts = localStorage.getItem(this.digimon.name);
      if (savedPosts) {
        this.digimon.posts = JSON.parse(savedPosts);
      }
    } else {
      console.error("Os dados do histórico não estão disponíveis.");
    }
  }
  

  submitPost() {
    // Adiciona o post ao digimon atual
    if (!this.digimon.posts) {
      this.digimon.posts = [];
    }
    this.digimon.posts.push({ content: this.postContent });

    // Salva os posts atualizados no localStorage
    localStorage.setItem(this.digimon.name, JSON.stringify(this.digimon.posts));

    // Limpa o conteúdo do post após a submissão
    this.postContent = '';
  }

  removePost(index: number) {
    // Remove o post pelo índice
    this.digimon.posts.splice(index, 1);

    // Atualiza os posts no localStorage
    localStorage.setItem(this.digimon.name, JSON.stringify(this.digimon.posts));
  }

  editPost(index: number, newContent: string) {
    // Edita o post pelo índice
    this.digimon.posts[index].content = newContent;

    // Atualiza os posts no localStorage
    localStorage.setItem(this.digimon.name, JSON.stringify(this.digimon.posts));
  }
}