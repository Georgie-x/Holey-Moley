
import styles from "./HighScores.module.css"



function HighScores() {
    return (
        <>
            <div className="highscores">
                <table>
                    <tr>
                        <th className="scoreName">Name</th>
                        <th className="scoreHigh">High Score</th>
                    </tr>
                    <tr>
                        <td>JonnyQuango</td>
                        <td>5500</td>
                    </tr>
                    <tr>
                        <td>JasonQuavers</td>
                        <td>3400</td>
                    </tr>
                    <tr>
                        <td>LynnGlivens</td>
                        <td>2400</td>
                    </tr>
                    <tr>
                        <td>GlubbleSocks</td>
                        <td>2200</td>
                    </tr>
                    <tr>
                        <td className="bottomName">MunkleChunks</td>
                        <td className="bottomScore">2</td>
                    </tr>
                </table>
            </div>
        </>
    )

}

export default HighScores