import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredients } from "../types";
import styles from './card-ingredients.module.css'

type Props = {
  data: Pick<Ingredients, 'id' | 'name' | 'price' |'image'>;
  count:number
};

function CardIngredient({ data, count }: Props) {
  console.log(count)
  return (
    <article className={styles.card} style={{position:'relative'}}>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img src={data.image} className="pl-4 pr-4"/>
      <div className={styles.price}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{data.name}</p>
    </article>
  );
}

export default CardIngredient;
 