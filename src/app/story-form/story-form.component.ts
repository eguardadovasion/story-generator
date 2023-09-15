
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
    this.hero = 'Andy';
    this.problem = 'the unsustainable cost of print servers';
    this.guide = 'Vasion';
    this.plan = 'immediately implement the PrinterLogic software suite';
    this.actionCall = 'sign up for a free 30-day trial today';
    this.consequencePos = 'a flourishing business due to simplified printing and the freeing of financial resources';
    this.consequenceNeg = 'continuing the struggle of trying to stay competitive without enough resources';
    this.company = 'Acme, Inc';
    this.complexity = 'low';
    this.genre = 'space opera';
    this.style = 'Isaac Asimov';
    this.industry = 'medical devices';
    this.tone = 'friendly';
    this.phrase = 'Yeah, buddy!';
    this.lang = 'english';
    this.story = {"message":'The story goes like this'};
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