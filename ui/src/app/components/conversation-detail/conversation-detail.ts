import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-conversation-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conversation-detail.html',
  styleUrls: ['./conversation-detail.scss'],
})
export class ConversationDetailComponent {
  constructor(public conversationService: ConversationService) {}
}
