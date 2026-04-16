using Microsoft.AspNetCore.SignalR;

namespace Backend.API.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinChat(string serviceId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, serviceId);
        }
    }
}
