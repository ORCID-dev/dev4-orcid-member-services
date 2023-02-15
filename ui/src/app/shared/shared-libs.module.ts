import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
// TODO:
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [NgbModule, InfiniteScrollModule, CookieModule.forRoot(), /*FontAwesomeModule,*/ ReactiveFormsModule],
  exports: [FormsModule, CommonModule, NgbModule, /*NgJhipsterModule,*/ InfiniteScrollModule, /*FontAwesomeModule,*/ ReactiveFormsModule, TranslateModule]
})
export class GatewaySharedLibsModule {
  static forRoot() {
    return {
      ngModule: GatewaySharedLibsModule
    };
  }
}