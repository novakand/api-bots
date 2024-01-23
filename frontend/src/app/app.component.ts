import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private router: Router) {

  }
  public ngOnInit(): void {
  }

  public navigateTo(value: string): void {
    this.router.navigate(['../', value]);
  }

  public logout(): void {
    this.navigateTo('login');
  }
}
