import React from "react";
import MySelect from "./UI/Select/MySelect";
import MyInput from "./UI/Input/MyInput";

const PostFilter = ({filter, setFilter}) => {
    return (
      <div>
        <MyInput 
        value={filter.query}
        onChange={e => setFilter({...filter, query: e.target.value})} 
        placeholder="Поиск"></MyInput>
        
        <MySelect
        value={filter.sort}
        onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
        defaultValue="Сортировка"
        options={[
          {value: 'title', name: 'По названию'},
          {value: 'body', name: 'По описанию'}
        ]}></MySelect>
      </div>
    );
};

export default PostFilter;