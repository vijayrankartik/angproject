import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = "";
  enteredContent = "";
  post: Post;
  private mode = "create"
  private postId: string

  constructor(public postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = "edit"
        this.postId = paramMap.get('postId')
        this.postsService.getPost(this.postId
          ).subscribe((postData) => {
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content
            }
          })
      }
    })
  }

  // onAddPost(form: NgForm) {
  //   if(form.invalid){
  //     return;
  //   }
  //   this.postsService.addPost(form.value.id ,form.value.title, form.value.content);
  //   form.resetForm();
  // }

  onSavePost(form: NgForm) {
    if(form.invalid){
      return;
    }
    if(this.mode === 'create'){
      this.postsService.addPost(form.value.id ,form.value.title, form.value.content)
    }
    else{
      this.postsService.updatePost(this.postId ,form.value.title, form.value.content)
    }
    // this.postsService.addPost(form.value.id ,form.value.title, form.value.content);
    form.resetForm();
  }
}
