import {MessageService} from "primeng";
import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class NotFoundErrorHandler {
  constructor(private messageService: MessageService) {
  }

  matches(error: HttpErrorResponse): boolean {
    return error.status === 404;
  }

  handle(error: HttpErrorResponse) {
    if(error.error){
      this.messageService.add({severity: 'error', summary: 'Fehler', detail: error.error.message, life: 5000});
    }else{
      this.messageService.add({severity: 'error', summary: 'Fehler', detail: error.message, life: 5000});
    }
  }
}
