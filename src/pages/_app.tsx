import '../styles/global.scss'
import styles from '../styles/app.module.scss'

import {Header} from "../components/Header";
import {Player} from "../components/Player";
import {PlayerContext} from "../contexts/playerContext";
import {useState} from "react";

function MyApp({ Component, pageProps }) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, SetIsPlaying] = useState(false);

    function play (episode){
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        SetIsPlaying(true);
    }

    function togglePlay (){
        SetIsPlaying(!isPlaying);
    }

    function setPlayingState(state: boolean){
        SetIsPlaying(state);
    }


    return (
        <PlayerContext.Provider value={{episodeList, currentEpisodeIndex, play, isPlaying, togglePlay, setPlayingState}}>
            <div className={styles.wrapper}>
                <main>
                    <Header />
                    <Component {...pageProps} />
                </main>
                <Player />
            </div>
        </PlayerContext.Provider>
)
}

export default MyApp
