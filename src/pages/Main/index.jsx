import { Link } from 'react-router-dom';
import './index.css';

function Main() {
  return (
    <div className="main-container">

      <div className="top-section">
        <span>Why Choose Us?</span>
        <div className="box">Includes:<br/>
                  Student test questions<br/>
                  Campus questionnaire<br/>
                  Market research<br/>
                  ... ...
        </div>
        <div className="box">Advantages:<br/>
                  Quickly create a question bank<br/>
                  Quickly edit a set of questions<br/>
                  Quickly download the archive<br/>
                  ... ...
        </div>
        <div className="box">Oriented:<br/>
                  Colleges and universities<br/>
                  College teachers<br/>
                  Social survey<br/>
                  ... ...
          </div>
      </div>

      <div className="middle-section">
        <div className="image-container">
          <img src="Test1.jpg" alt="Image1" />
        </div>
        <div className="bordered-box1">Easy to use:<br/>
                Just use it - download it easily<br/>
                Share experiences - Upload easily<br/>
                Zero to whole - fast integration
        </div>
      </div>

      <div className="bottom-section">
        <div className="bordered-box2">Clear permissions:<br/>
                The user's visual permission<br/>
                User permissions<br/>
                Edit permissions for the user<br/>
                Admin permissions in the background
        </div>
        <div className="image-container">
          <img src="Test2.jpg" alt="Image2" />
        </div>
      </div>

    </div>
  );
}

export default Main;
