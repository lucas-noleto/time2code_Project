import styles from './SubmitButton.module.css'

function SubmitButton({btnText}){
    return(
        <button className={styles.btn}>{btnText}</button>  
    )
}

export default SubmitButton