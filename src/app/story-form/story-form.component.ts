
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent implements OnInit {
  myForm: FormGroup;
  hero: string;
  problem: string;
  guide: string;
  plan: string;
  actionCall: string;
  consequencePos: string;
  consequenceNeg: string;
  company: string;
  length: number = 60;
  complexity: string;
  genre: string;
  style: string;
  industry: string;
  tone: string;
  phrase: string;
  lang: string;
  story: any;
  constructor(private fb: FormBuilder, private apiService: ApiService) { 
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.hero = 'Sam Altmann';
    this.problem = 'Losing valuable development time doing mundane business processes';
    this.guide = 'Vasion';
    this.plan = 'Automate business processes with Vasion Suite';
    this.actionCall = 'Sign up today for a free trial of Vasion Suite';
    this.consequencePos = 'ChatGPT reaches the singularity';
    this.consequenceNeg = 'ChatGPT is shut down by Google Bard';
    this.company = 'OpenAI';
    this.complexity = 'High';
    this.genre = 'High Fantasy';
    this.style = 'Tolkein';
    this.industry = 'Software';
    this.tone = 'Inspiring';
    this.phrase = 'All your base are belong to us';
    this.lang = 'English';
    this.story = null;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onSliderChange(val:number) {
    this.length = val;
  }
  async sendQuery() {
    let query = 'Tell me a story in the SB7 framework.';
    query += 'The hero is ' + this.hero;
    query += '. The problem is ' + this.problem;
    query += '. The guide is ' + this.guide;
    query += '. The plan is ' + this.plan;
    query += '. The call to action is ' + this.actionCall;
    query += '. The consequence of not taking action is ' + this.consequenceNeg;
    query += '. The consequence of taking action is ' + this.consequencePos;
    query += '. The name of the company the hero works for is ' + this.company;
    if (this.length > 0) {
      query += '. The length of the story is ' + this.length + ' seconds. ';
    }
    if (this.genre !== '') {
      query += 'The genre of the story is' + this.genre;
    }
    
    if (this.style !== '') {
      query += 'Write the story in the style of' + this.style;
    }

    if (this.complexity !== '') {
      query += '. The complexity of the story is ' + this.complexity;
    }
    query += '. The industry of the hero is ' + this.industry;
    query += '. The tone of the story is ' + this.tone;
    
    if (this.phrase !== '') {
      query += '. Include the phrase \"' + this.phrase + '\" somewhere in the story.';
    }
    if (this.lang !== '') {
      query += ' The language of the story is ' + this.lang + '.';
    }
    await this.generateStory(query);

  }
  async generateStory(query: string){
    
     await this.apiService.generateStory(query).subscribe(data => {
      this.story = data;
    });
    
    return this.story;
  }
}