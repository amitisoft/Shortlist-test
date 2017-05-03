import {Injectable} from "@angular/core";
import {Observable, Observer} from 'rxjs';
import {CandidateServiceImpl} from '../service/candidate-service';
import {CandidateDto} from '../dto/candidate-dto';
import {CandidatesDto} from '../dto/candidates-dto';
import {Candidate} from '../domain/candidate';


@Injectable()
export class CandidateFacade {

    constructor(private candidateService: CandidateServiceImpl) {
        console.log("in CandidateFacade constructor()");
    }


    findCandidateByEmailId(data: any): Observable<string> {
    return this.candidateService.findCandidateByEmailId(data);
  }

    // getAll(): Observable<CandidatesDto> {
    //     console.log("in CandidateFacade getAll()");

    //     return this.candidateService.getAll()
    //         .map((candidates) => {
    //             return {
    //                 candidates: candidates.map(this.mapCandidateToDto)
    //             }
    //         });
    // }

    // findbyId(candidateId: string): Observable<Candidate> {
    //     console.log("in CandidateFacade findById()");
    //     return this.candidateService.findById(candidateId);
    // }

    //  updateCandidate(data: any) :Observable<Candidate> {
    //      console.log("in updatecandiate facade", data);
    //     return this.candidateService.update(data);
    // }

    // // findbyEmail(candidateId:string): Observable<Candidate> {
    // //     console.log("in CandidateFacade findById()");
    // //     return this.candidateService.findById(candidateId);
    // // }


    // private mapCandidateToDto(candidate: Candidate): CandidateDto {
    //     console.log("in mapCandidateToDto" + JSON.stringify(candidate));
    //     return {
    //         candidateId: candidate.candiateId,
    //         fullName: `${candidate.firstName} ${candidate.lastName}`,
    //         email: candidate.email
    //     }
    // }
}