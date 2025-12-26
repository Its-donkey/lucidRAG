import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conversation-list.html',
  styleUrls: ['./conversation-list.scss'],
})
export class ConversationListComponent implements OnInit {
  conversations = signal<any[]>([]);

  constructor(public conversationService: ConversationService) {}

  ngOnInit(): void {
    this.conversationService.getConversations().subscribe({
      next: (data) => this.conversations.set(data.conversations),
      error: () => this.conversations.set([]),
    });
  }

  selectConversation(conv: any): void {
    this.conversationService.selectConversation(conv);
  }
}
