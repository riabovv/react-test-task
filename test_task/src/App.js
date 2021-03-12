import {useState, useEffect, useRef} from 'react'
import "./App.css";


const App = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  
  const changeItem = event => {
      setSearch(event.target.value);
  }

  const male_chekbox = useRef(null);
  const female_chekbox = useRef(null);

  const checkboxMale = () => {
    if(male_chekbox.current.checked === true && female_chekbox.current.checked === true){
      setSearch("");
    }
    else{(male_chekbox.current.checked === true) ? setSearch('m') : setSearch('')}
    
  }

  const chekboxFemale = () => {
    if(male_chekbox.current.checked === true && female_chekbox.current.checked === true){
      setSearch("");
    }
    else{(female_chekbox.current.checked === true) ? setSearch('f') : setSearch('')}
    
  }

  useEffect(() => {
    fetch("https://venbest-test.herokuapp.com/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div className="error">Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    
    let ITEM_SEARCH = items.filter(item => item.name.includes(search) || item.lastname.includes(search) || item.age === (+search) || item.sex === search);

  /* Фильтр */ return (
      <div className="testApp">
        <div className="filters">
            <span className="filters-title">Фильтры:</span>
            <div className="name">
                <label htmlFor="NAME">Имя:</label>
                <input type="text" id="NAME" onChange={changeItem}/>
            </div>
            <div className="lastname">
                <label htmlFor="LASTNAME">Фамилия:</label>
                <input type="text" id="LASTNAME" onChange={changeItem}/>
            </div>
            <div className="age">
                <label htmlFor="AGE">Возраст:</label>
                <input type="text" id="AGE" onChange={changeItem}/>
            </div>
            <div className="sex">
                <span>Пол:</span>
                <div className="male">
                    <input type="checkbox" id="MALE" ref={male_chekbox} onClick={checkboxMale}/>
                    <label htmlFor="MALE">М</label>
                </div>
                <div className="female">
                    <input type="checkbox" id="FEMALE" ref={female_chekbox} onClick={chekboxFemale}/>
                    <label htmlFor="FEMALE">Ж</label>
                </div>
            </div>
        </div>
       {/* Отображение полученных данных из сервера */(search === '') ? items.map((item, index) => (
          <ul key={index} className="itemList">
            <li className="itemList-name">{item.name} {item.lastname}</li>
            <li>Возраст: {item.age}</li>
            <li>Пол: {(item.sex === 'm') ? "Мужской" : (item.sex === "f") ? "Женский" : "-"}</li>
          </ul>
        )) : /* Отфильтрованные данные */ ITEM_SEARCH.map((item, index) => (
          <ul key={index} className="itemList">
                  <li className="itemList-name">{item.name} {item.lastname}</li>
                  <li>Возраст: {item.age}</li>
              <li>Пол: {(item.sex) === 'm' ? 'Мужской' : (item.sex) === 'f' ? 'Женский' : '-' }</li>
              </ul>
        ))}
      </div>
    );
  }
}

export default App;
