import {createContext, ReactNode, useContext, useState} from "react";

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    playList: (list: Episode[], index: number) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleShuffle: () => void;
    clearPlayerState: () => void;
    toggleLoop: () => void;
    setPlayingState: (state: boolean) => void;
    play: (episode: Episode) => void;
    hasNext: boolean;
    hasPrevious: boolean;
    isLooping: boolean;
    isShuffling: boolean;
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({children}: PlayerContextProviderProps) {

    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, SetIsPlaying] = useState(false);
    const [isLooping, SetIsLooping] = useState(false);
    const [isShuffling, SetIsShuffling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        SetIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        SetIsPlaying(true);
    }

    function togglePlay() {
        SetIsPlaying(!isPlaying);
    }

    function toggleLoop() {
        SetIsLooping(!isLooping);
    }

    function toggleShuffle() {
        SetIsShuffling(!isShuffling);
    }

    function setPlayingState(state: boolean) {
        SetIsPlaying(state);
    }

    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;
    const hasPrevious = currentEpisodeIndex > 0;

    function playNext() {
        if (isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)

            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    function clearPlayerState (){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }


    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                isPlaying,
                togglePlay,
                setPlayingState,
                playList,
                playNext,
                playPrevious,
                hasNext,
                hasPrevious,
                isLooping,
                toggleLoop,
                toggleShuffle,
                isShuffling,
                clearPlayerState
            }}
        >
            {children}
        </PlayerContext.Provider>
    )

}

export const usePlayer = () => {
    return useContext(PlayerContext);
}