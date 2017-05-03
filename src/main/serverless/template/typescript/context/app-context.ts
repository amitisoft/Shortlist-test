import {CandidateServiceImpl} from "../service/candidate-service";
import {CandidateFacade} from "../facade/candidate-facade";

import {BookingServiceImpl} from "../service/booking-service";
import {BookingFacade} from "../facade/booking-facade";

import {QsnIdsServiceImpl} from "../service/QsnIds-service";
import {QsnIdsFacade} from "../facade/QsnIds-facade";
import {QuestionServiceImpl} from "../service/Question-service";
import {QuestionFacade} from "../facade/Question-facade";
import {ResultServiceImpl} from "../service/Result-service";
import {ResultFacade} from "../facade/Result-facade";

import { CreateQuestionFacade } from '../facade/create-question-facade';
import{CreateQuestionServiceImpl} from '../service/create-question-service';
import { CreateQuestionPaperFacade } from '../facade/create-question-paper-facade';
import{createQuestionPaperserviceImpl} from '../service/create-question-paper-service';



export const AppProviders = [
    CandidateServiceImpl,
    CandidateFacade,
    BookingFacade,
    BookingServiceImpl,
    QsnIdsServiceImpl,
    QsnIdsFacade,
    QuestionServiceImpl,
    QuestionFacade,
    ResultServiceImpl,
    ResultFacade,
     CreateQuestionFacade,
    CreateQuestionServiceImpl,
    CreateQuestionPaperFacade,
    createQuestionPaperserviceImpl
];
