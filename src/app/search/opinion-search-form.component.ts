import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "OpinionSearchForm",
    template: `
        <StackLayout class="search-container">
            <Label text="🔍 Buscar en opiniones" class="h3"></Label>
            <TextField [(ngModel)]="searchText" hint="Buscar por usuario o comentario..."></TextField>
            <Button text="Filtrar Opiniones" (tap)="onSearch()" class="btn btn-primary"></Button>
        </StackLayout>
    `,
    styles: [`
        .search-container {
            background-color: #f8f9fa;
            padding: 15;
            border-radius: 8;
            margin-bottom: 20;
        }
    `]
})
export class OpinionSearchFormComponent {
    searchText: string = "";
    @Output() search: EventEmitter<string> = new EventEmitter();

    onSearch(): void {
        console.log("Buscando opiniones:", this.searchText);
        this.search.emit(this.searchText);
    }
}