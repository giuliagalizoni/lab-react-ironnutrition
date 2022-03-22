import { useState, useEffect } from 'react';

import 'bulma/css/bulma.css';
import foodsJson from '../foods.json';

import FoodBox from './FoodBox';
import Search from './Search';
import TodayFoods from './TodayFoods';
import AddFoodForm from './AddFoodForm';

function App() {
  const [foods, setFoods] = useState([...foodsJson]);
  const [searchTerm, setSearchTerm] = useState('');
  const [todayFoods, setTodayFoods] = useState([]);
  const [toggleAddFood, setToggleAddFood] = useState(false);

  // TENTATIVA 1
  const [newFood, setNewFood] = useState({ name: '', calories: '', image: '' });

  function handleFormChange(event) {
    const clone = { ...newFood };
    clone[event.target.name] = event.target.value;
    setNewFood(clone);
  }

  // Faz o filtro da lista de comidas somente quando o termo de busca terminou de atualizar
  useEffect(() => {
    filterFoods(searchTerm);
    // console.log('esse é o novo objeto', newFood);
  }, [searchTerm]);

  // // PRECISO DESCOBRIR COMO ACESSAR O VALOR CERTO AQUI
  // useEffect(() => {
  //   console.log('esse é o novo objeto', newFood);
  // });
  // // VOLTAR AQUI DEPOIS

  function filterFoods(term) {
    const clone = [...foods];

    // Extraindo somente as comidas cujo nome inclui o termo de busca
    const filtered = clone.filter((currentFoodObj) => {
      return currentFoodObj.name.toLowerCase().includes(term.toLowerCase());
    });

    setFoods(filtered);

    // Se o termo de busca estiver vazio, voltamos pra lista original
    if (!term) {
      setFoods([...foodsJson]);
    }
  }

  function onFoodAdd(foodObj) {
    const clone = [...todayFoods];

    clone.push(foodObj);
    setTodayFoods(clone);
  }

  function renderNewFood(newFood) {
    console.log('esse é o novo objeto', newFood);

    const clone = [...foods];
    clone.push(newFood);
    setFoods(clone);
  }

  return (
    <div className="container">
      <h1 className="title">IronNutrition</h1>
      {/* FAZER ITERATION 3 AQUI */}
      <button
        className="button"
        onClick={() => setToggleAddFood(!toggleAddFood)}
      >
        Add Food
      </button>
      {toggleAddFood && (
        <AddFoodForm
          onChange={handleFormChange}
          onSubmitNewFood={() => renderNewFood(newFood)}
        />
      )}
      <Search
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="columns">
        <div className="column">
          {/* Renderiza uma Foodbox pra cada objeto de comida na array */}
          {foods.map((currentFoodObj) => (
            <FoodBox
              key={currentFoodObj.name}
              food={currentFoodObj}
              onFoodAdd={onFoodAdd}
            />
          ))}
        </div>
        <TodayFoods todayFoods={todayFoods} />
      </div>
    </div>
  );
}

export default App;
