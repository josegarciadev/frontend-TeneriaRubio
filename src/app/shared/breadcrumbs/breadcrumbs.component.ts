import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, MetaDefinition, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;
  contenido: string;
  constructor(private router: Router,
              private title: Title,
              private meta: Meta) {

    this.getDataRouter()
    .subscribe(data => {
      
      this.titulo = data.titulo;
      this.contenido = data.content;
      this.title.setTitle(this.titulo);

      const metaTag: MetaDefinition = {
        name: 'definition',
        content: this.contenido
      }

      this.meta.updateTag(metaTag);
    });

  }

  ngOnInit() {
  }

  getDataRouter(){
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null ),
      map((event: ActivationEnd) =>event.snapshot.data )

    );
  }
}
