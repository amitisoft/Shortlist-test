import { CreateQuestionPaperFacade } from '../facade/create-question-paper-facade';
import { Injector } from '@angular/core';
import { HttpContextImpl } from "../http/http-context-impl";

export class QuestionPaperHandler {

  static createQuestionPaper (httpContext:HttpContextImpl,injector:Injector) : void {
          console.log("CreateQuestionHandler");
    let body = httpContext.getRequestBody();
        console.log("pathParameters-----",body);

        injector.get(CreateQuestionPaperFacade).createQuestionPaper(body)
            .subscribe(result => {
                httpContext.ok(200, result);
            },  err => {
                httpContext.fail(err, 500);
        },()=>{
             httpContext.ok(200);
        });
    }

}