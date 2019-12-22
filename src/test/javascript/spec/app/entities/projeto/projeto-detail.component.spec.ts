import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppCreatorTestModule } from '../../../test.module';
import { ProjetoDetailComponent } from 'app/entities/projeto/projeto-detail.component';
import { Projeto } from 'app/shared/model/projeto.model';

describe('Component Tests', () => {
  describe('Projeto Management Detail Component', () => {
    let comp: ProjetoDetailComponent;
    let fixture: ComponentFixture<ProjetoDetailComponent>;
    const route = ({ data: of({ projeto: new Projeto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppCreatorTestModule],
        declarations: [ProjetoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProjetoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProjetoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load projeto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.projeto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
