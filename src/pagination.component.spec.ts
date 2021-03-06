/**
 * This file is part of the ng2-pagination package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {async, TestBed, ComponentFixture} from '@angular/core/testing';
import {PaginationComponent} from './pagination.component';
import {By} from "@angular/platform-browser";
import {Component} from "@angular/core";
import {HighlightDirective} from "./directives/highlight.directive";
import {HighlightService} from "./services/highlight.service";

@Component({
    template: `<vardius-pagination [total]="total" [page]="page" [limit]="limit" (setLimit)="setLimit($event)" (goTo)="goToPage($event)" class="text-center"></vardius-pagination>`
})
class TestHostComponent {
    total: number = 100;
    page: number = 1;
    limit: number = 10;

    setLimit(limit: number) {
        this.limit = limit;
    }

    goToPage(page: number) {
        this.page = page;
    }
}

describe('PaginationComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let testHost: TestHostComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, PaginationComponent, HighlightDirective],
            providers: [HighlightService]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        testHost = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should display page', () => {
        let currentPage = fixture.debugElement.query(By.css('.current a'));
        expect(currentPage.nativeElement.textContent).toContain(testHost.page);
    });

    it('should raise goTo event when clicked', () => {
        let lastPage = fixture.debugElement.query(By.css('.last a'));
        lastPage.triggerEventHandler('click', null);
        expect(testHost.page).toBe(Math.ceil(testHost.total / testHost.limit));
    });

    it('should raise setLimit event when clicked', () => {
        let limit = fixture.debugElement.query(By.css('.pagination li:first-child a'));
        limit.triggerEventHandler('click', null);
        expect(testHost.limit).toBe(10);
    });
});
