import { Component ,Input,Signal, computed, signal,input, Output, EventEmitter} from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';


const randomIndex=Math.floor(Math.random()*DUMMY_USERS.length)
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // hamade=signal()

  selectedUser=signal(DUMMY_USERS[randomIndex]);

  //receive data from outside
  @Input({required:true}) id!:string
@Input({required:true}) avatar!:string;
@Input({required:true}) name!:string;
@Output() data= new EventEmitter<string>()
//input function =>signals

// avatar=input.required<string>();
// name=input.required<string>()

   get imagePath(){
    return 'assets/users/'+this.avatar
   }
  // imagePath=computed(()=>'assets/users/'+this.selectedUser().avatar)
   onSelectUser(){
    this.data.emit(this.name) //emit the name of the selected user
    
    // const randomIndex=Math.floor(Math.random()*DUMMY_USERS.length)
    // this.selectedUser.set(DUMMY_USERS[randomIndex])
   }
}
