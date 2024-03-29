import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { faTimesCircle, faCheckCircle, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';

import { IMSMember } from 'app/shared/model/member.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { MSMemberService } from './member.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-ms-member',
  templateUrl: './member.component.html'
})
export class MSMemberComponent implements OnInit, OnDestroy {
  currentAccount: any;
  msMember: IMSMember[];
  error: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  reverse: any;
  faTimesCircle = faTimesCircle;
  faCheckCircle = faCheckCircle;
  faTimes = faTimes;
  faSearch = faSearch;
  itemCount: string;
  searchTerm: string;
  submittedSearchTerm: string;
  paginationHeaderSubscription: Subscription;

  constructor(
    protected msMemberService: MSMemberService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected translate: TranslateService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });

    this.eventSubscriber = this.eventManager.subscribe('msMemberListModification', () => {
      this.searchTerm = '';
      this.submittedSearchTerm = '';
      this.loadAll();
    });
  }

  loadAll() {
    if (this.submittedSearchTerm) {
      this.searchTerm = this.submittedSearchTerm;
    } else {
      this.searchTerm = '';
    }

    this.msMemberService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        filter: this.submittedSearchTerm ? encodeURIComponent(this.submittedSearchTerm) : ''
      })
      .subscribe(
        (res: HttpResponse<IMSMember[]>) => this.paginateMSMember(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadPage(page: number) {
    this.transition();
  }

  transition() {
    this.router.navigate(['/member'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
        filter: this.submittedSearchTerm ? this.submittedSearchTerm : ''
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/member',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
        filter: this.submittedSearchTerm ? this.submittedSearchTerm : ''
      }
    ]);
    this.loadAll();
  }

  trackId(index: number, item: IMSMember) {
    return item.id;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  resetSearch() {
    this.page = 1;
    this.searchTerm = '';
    this.submittedSearchTerm = '';
    this.loadAll();
  }

  submitSearch() {
    this.page = 1;
    this.submittedSearchTerm = this.searchTerm;
    this.loadAll();
  }

  protected paginateMSMember(data: IMSMember[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.msMember = data;
    const first = (this.page - 1) * this.itemsPerPage === 0 ? 1 : (this.page - 1) * this.itemsPerPage + 1;
    const second = this.page * this.itemsPerPage < this.totalItems ? this.page * this.itemsPerPage : this.totalItems;
    this.paginationHeaderSubscription = this.translate
      .get('global.item-count.string', { first, second, total: this.totalItems })
      .subscribe(paginationHeader => (this.itemCount = paginationHeader));
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
    if (this.paginationHeaderSubscription) {
      this.paginationHeaderSubscription.unsubscribe();
    }
  }
}
