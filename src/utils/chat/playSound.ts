import { createAudioResource, StreamType, AudioPlayerStatus, createAudioPlayer, entersState } from "@discordjs/voice";


const player = createAudioPlayer();

export default function playSound() {

    /* const resource = createAudioResource('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', {
        inputType: StreamType.Arbitrary,
    });

    player.play(resource);

    return entersState(player, AudioPlayerStatus.Playing, 5e3); */

    console.log('hey');
}