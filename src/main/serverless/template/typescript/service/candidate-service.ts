import {Injectable} from "@angular/core";
import {Observable, Observer} from 'rxjs';
import {Candidate} from '../domain/candidate';
import {DynamoDB, SES} from "aws-sdk";

const AWS = require('aws-sdk');

import DocumentClient = DynamoDB.DocumentClient;

AWS.config.update({
    region: "us-east-1"
});

@Injectable()
export class CandidateServiceImpl {

    constructor() {
        console.log("in CandidateServiceImpl constructor()");
    }


     // checking email is Exist or not in Candidate table
        findCandidateByEmailId(data: any): Observable<string> {
        
        console.log("in CandidateServiceImpl findCandidateByEmail()");

        let emailid = data.emails;
        const queryParams: DynamoDB.Types.QueryInput = {
            TableName: "candidate",
            IndexName: "emailIndex",
            ProjectionExpression: "candidateId",
            KeyConditionExpression: "#emailId = :emailIdFilter",
            ExpressionAttributeNames: {
                "#emailId": "email"
            },
            ExpressionAttributeValues: {
                ":emailIdFilter": emailid
            }
        }
        const documentClient = new DocumentClient();
        return Observable.create((observer: Observer<string>) => {
            console.log("Executing query with parameters " + queryParams);
            documentClient.query(queryParams, (err, data: any) => {
               // console.log(`did we get error ${err}`);
                if (err) {
                    observer.error(err);
                    throw err;
                }
               console.log(`data items:Email receieved ${data.Items.length}`);
                if (data.Items.length === 0) {
                   console.log(" Email is not exist in candidates table "); //  Email is not present send to this msg
                   //alert(" Email is not exist in candidates table ");
                    observer.complete();
                    return;
                }
                console.log("candidateID", data.Items[0].candidateId); // if email is exist then get the candidate Id
                observer.next(data.Items[0]);                         
                observer.complete();
            });
        });
    }

//     sendEmail(email, messageBody) {
//             const emailConfig = {
//                 region: 'us-east-1'
//             };

//             const emailSES = new SES(emailConfig);

//             const p = new Promise((res, rej)=>{

//                 if(!email || !messageBody) {
//                     rej('Please provide email and message');
//                     return;
//                 }

//                 const emailParams: AWS.SES.SendEmailRequest = this.createEmailParamConfig(email, messageBody);
//                 emailSES.sendEmail(emailParams, (err:any, data: AWS.SES.SendEmailResponse) => {
//                     if(err) {
//                         console.log(err);
//                         rej(`Error in sending out email ${err}`)
//                         return;
//                     }

//                     res(`Successfully sent email to ${email}`);

//                 });

//             });
//     }

//     update(data: any): Observable<Candidate> {
//         console.log("in CandidateServiceImpl update()",data);
//         console.log(`data received ${data.firstName}`);
//         console.log(`data received ${data.lastName}`);
//         console.log(`data received ${data.email}`);
//         console.log(`data received ${data.candidateId}`);

//         const documentClient = new DocumentClient();
//         const params = {
//             TableName: "candidate",
//             Key: {
//                 candidateId: data.candidateId,
//             },
//             ExpressionAttributeNames: {
//                 '#fn': 'firstName',
//                 '#ln': 'lastName',
//                 '#em': 'email'
//             },
//             ExpressionAttributeValues: {
//                 ':fn': data.firstName,
//                 ':ln': data.lastName,
//                 ':em': data.email,
//             },
//             UpdateExpression: 'SET #fn = :fn, #ln = :ln, #em = :em',
//             ReturnValues: 'ALL_NEW',
//         };

//         return Observable.create((observer:Observer<Candidate>) => {

//             documentClient.update(params, (err, data: any) => {
//                 if(err) {
//                     console.error(err);
//                     observer.error(err);
//                     return;
//                 }
//                 console.log(`result ${JSON.stringify(data)}`);
//                 observer.next(data.Attributes);
//                 observer.complete();
//             });
//         });
//     }

//     findById(candidateId:string): Observable<Candidate> {
//         console.log("in CandidateServiceImpl find()");

//         const queryParams: DynamoDB.Types.QueryInput = {
//             TableName: "candidate1",
//             ProjectionExpression: "candidateId, firstName, lastName, email, phoneNumber",
//             KeyConditionExpression: "#candidateId = :candidateIdFilter",
//             ExpressionAttributeNames:{
//                 "#candidateId": "candidateId"
//             },
//             ExpressionAttributeValues: {
//                 ":candidateIdFilter": candidateId
//             }
//         }

//         const documentClient = new DocumentClient();
//         return Observable.create((observer:Observer<Candidate>) => {
//             console.log("Executing query with parameters " + queryParams);
//             documentClient.query(queryParams,(err,data:any) => {
//                 console.log(`did we get error ${err}`);
//                 if(err) {
//                     observer.error(err);
//                     throw err;
//                 }
//                 console.log(`data items receieved ${data.Items.length}`);
//                 if(data.Items.length === 0) {
//                     console.log("no data received for getAll candidates");
//                     observer.complete();
//                     return;
//                 }
//                 data.Items.forEach((item) => {
//                     console.log(`candidate Id ${item.candidateId}`);
//                     console.log(`candidate firstName ${item.firstName}`);
//                     console.log(`candidate lastName ${item.lastName}`);
//                     console.log(`candidate email ${item.email}`);
//                 });
//                 observer.next(data.Items[0]);
//                 observer.complete();

//             });
//         });

//     }

//     getAll(): Observable<Candidate[]> {
//         console.log("in CandidateServiceImpl getAll()");

//         const queryParams: DynamoDB.Types.QueryInput = {
//             TableName: "candidate1",
//             ProjectionExpression: "candidateId, firstName, lastName, email",
//         }

//         const documentClient = new DocumentClient();
//         return Observable.create((observer:Observer<Candidate>) => {
//             console.log("Executing query with parameters " + queryParams);
//             documentClient.scan(queryParams,(err,data:any) => {
//                 console.log(`did we get error ${err}`);
//                 if(err) {
//                     observer.error(err);
//                     throw err;
//                 }
//                 console.log(`data items receieved ${data.Items.length}`);
//                 if(data.Items.length === 0) {
//                     console.log("no data received for getAll candidates");
//                     observer.complete();
//                     return;
//                 }
//                 data.Items.forEach((item) => {
//                     console.log(`candidate Id ${item.candidateId}`);
//                     console.log(`candidate firstName ${item.firstName}`);
//                     console.log(`candidate lastName ${item.lastName}`);
//                     console.log(`candidate email ${item.email}`);
//                 });
//                 observer.next(data.Items);
//                 observer.complete();

//             });

//         });

//     }

//    private createEmailParamConfig(email, message): AWS.SES.SendEmailRequest {
//        const params = {
//            Destination: {
//                BccAddresses: [],
//                CcAddresses: [],
//                ToAddresses: [ email ]
//            },
//            Message: {
//                Body: {
//                    Html: {
//                        Data: this.generateEmailTemplate("shyamal@amiti.in", message),
//                        Charset: 'UTF-8'
//                    }
//                },
//                Subject: {
//                    Data: 'Testing Email',
//                    Charset: 'UTF-8'
//                }
//            },
//            Source: 'shyamal@amiti.in',
//            ReplyToAddresses: [ 'shyamal@amiti.in' ],
//            ReturnPath: 'shyamal@amiti.in'
//        }
//        return params;
//    }

//    private generateEmailTemplate(emailFrom:string, message:string) : string {
//        return `
//          <!DOCTYPE html>
//          <html>
//            <head>
//              <meta charset='UTF-8' />
//              <title>title</title>
//            </head>
//            <body>
//             <table border='0' cellpadding='0' cellspacing='0' height='100%' width='100%' id='bodyTable'>
//              <tr>
//                  <td align='center' valign='top'>
//                      <table border='0' cellpadding='20' cellspacing='0' width='600' id='emailContainer'>
//                          <tr style='background-color:#99ccff;'>
//                              <td align='center' valign='top'>
//                                  <table border='0' cellpadding='20' cellspacing='0' width='100%' id='emailBody'>
//                                      <tr>
//                                          <td align='center' valign='top' style='color:#337ab7;'>
//                                              <h3><a href="http://mail.amiti.in/verify.html?token=${message}">http://mail.amiti.in/verify.html?token=${message}</a>
//                                              </h3>
//                                          </td>
//                                      </tr>
//                                  </table>
//                              </td>
//                          </tr>
//                          <tr style='background-color:#74a9d8;'>
//                              <td align='center' valign='top'>
//                                  <table border='0' cellpadding='20' cellspacing='0' width='100%' id='emailReply'>
//                                      <tr style='font-size: 1.2rem'>
//                                          <td align='center' valign='top'>
//                                              <span style='color:#286090; font-weight:bold;'>Send From:</span> <br/> ${emailFrom}
//                                          </td>
//                                      </tr>
//                                  </table>
//                              </td>
//                          </tr>
//                      </table>
//                  </td>
//              </tr>
//              </table>
//            </body>
//          </html>
// `
//    }



}