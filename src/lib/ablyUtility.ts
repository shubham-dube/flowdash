import { UserModel } from '../models';
import Ably from 'ably';

const ably = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY  });

const userChannel = ably.channels.get('user-presence');

userChannel.subscribe('update-presence', async (message) => {
  const { userId, isActive, lastActiveAt } = message.data;
  try {
    await UserModel.findByIdAndUpdate(userId, {
      isActive,
      lastActiveAt: isActive ? new Date(lastActiveAt) : null,
    });
    userChannel.publish('presence-notification', {
      userId,
      isActive,
      timestamp: new Date().toISOString(),
    });
    console.log(`Updated presence for user ${userId}`);
  } catch (err) {
    console.error('Error updating presence:', err);
  }
});

export const publishToUserChannel = async (
  userId: string,
  event: string,
  data: unknown
) => {
  const channel = ably.channels.get(userId);
  await channel.publish(event, data);
};

export const publishToProjectChannel = async (
  projectId: string,
  event: string,
  data: unknown
) => {
  const channel = ably.channels.get(projectId);
  await channel.publish(event, data);
};
