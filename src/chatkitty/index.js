import ChatKitty from 'chatkitty';

export const kitty = ChatKitty.getInstance('b39eeaaa-5a72-4e38-a1de-5ec2725029ec');

export function getChannelDisplayName(channel) {
  if (channel.type === 'DIRECT') {
    return channel.members.map((member) => member.displayName).join(', ');
  } else {
    return channel.name;
  }
}