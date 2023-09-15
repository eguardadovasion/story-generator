import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }
    getMessage() {
        return this.http.get('http://localhost:3000/api/message');
    }
    generateStory(query: string){
        var data = "message=" + encodeURIComponent(query);
        return this.http.post('http://localhost:3000/api/stories', data, {headers: {
            "Content-Type": "application/x-www-form-urlencoded",
           }});
    }
}