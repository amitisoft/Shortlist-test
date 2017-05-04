import 'reflect-metadata';
import { GetCandidateHandler } from './typescript/web/get-candidate-handler';
import { AppProviders } from './typescript/context/app-context';
import { ExecutionContextImpl } from "./typescript/context/execution-context-impl";


import {GetQsnHandler} from './typescript/web/get-Question-handler';
import { updateResultHandler } from './typescript/web/update-Result-handler';

import {CreateQuestionHandler} from './typescript/web/create-question-handler';
import {QuestionPaperHandler} from './typescript/web/question-paper-handler';

import { TestLinkHandler } from './typescript/web/test-link-handler';


// exports.getAllCandidatesFunction = ExecutionContextImpl.createHttpHandler(AppProviders, GetCandidateHandler.getAllCandidates);
// exports.findCandiateByIdFunction = ExecutionContextImpl.createHttpHandler(AppProviders, GetCandidateHandler.findCandidateById);

/**
 * kirankumar 
 */

 exports.startTestDashboard = ExecutionContextImpl.createHttpHandler(AppProviders, GetCandidateHandler.startTestDashboard);
exports.getCandidateHomePageInfo = ExecutionContextImpl.createHttpHandler(AppProviders, GetCandidateHandler.getCandidateHomePageInfo);


/**
 * monica
 */
 exports.getAllQsnIdsFunction = ExecutionContextImpl.createHttpHandler(AppProviders, GetQsnHandler.getQsn);
   exports.updateResultFunction = ExecutionContextImpl.createHttpHandler(AppProviders, updateResultHandler.updateResult);

/**
 * kiran
 */
 exports.createQuestionPaperFunction = ExecutionContextImpl.createHttpHandler(AppProviders, QuestionPaperHandler.createQuestionPaper);
  exports.createQuestionFunction = ExecutionContextImpl.createHttpHandler(AppProviders, CreateQuestionHandler.createQuestion);
exports.getQuestionByCategoryFunction = ExecutionContextImpl.createHttpHandler(AppProviders, CreateQuestionHandler.getQuestionByCategory);
/**
 * ashok
 */

 exports.createTestLinkFunction = ExecutionContextImpl.createHttpHandler(AppProviders, TestLinkHandler.findCandidateByEmailId);

