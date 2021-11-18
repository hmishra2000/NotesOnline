import Note from './Note';


function Home(props) {
    const {showAlert} = props

    return (
            <div className="container">
                <Note  showAlert={showAlert} />
            </div>
        
    )
}

export default Home
