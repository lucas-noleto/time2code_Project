import styles from './Submit.module.css'

function SubmitButton({btnText}){
    return(
        <button className={styles.btn}>{btnText}</button>  
    )
}

export default SubmitButton