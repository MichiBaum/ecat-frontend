import {HttpResponseErrorHandler} from "./http-response-error-handler";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthErrorHandler implements HttpResponseErrorHandler{

  constructor(private messageService: MessageService) {}

  matches(error: HttpErrorResponse): boolean {
    return error.status === 403;
  }

  handle(error: HttpErrorResponse) {
    if(error.error){
      this.messageService.add({severity: 'error', summary: 'Fehler', detail: error.error.message, life: 5000});
    }else{
      this.messageService.add({severity: 'error', summary: 'Fehler', detail: error.message, life: 5000});
    }
  }
}
