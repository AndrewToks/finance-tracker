'use client'

import { useState,useEffect,createContext } from "react";

//Firebase
import {db} from '@/lib/firebase'
import {
    collection,
    addDoc, 
    getDocs, 
    doc, 
    deleteDoc,
    updateDoc
} from 'firebase/firestore'
import ExpenseCategory from "@/components/ExpenseCategory";

export const financeContext = createContext({
    Income:[],
    expenses:[],
    addIncomeItem : async () =>{},
    removeIncomeItem : async () =>{},
    addExpenseItem:async ()=>{}
});

export default function FinanceContextProvider({children}){
        const [Income,setIncome] = useState([]);
        const [expenses,setExpenses] = useState([]);

        const addExpenseItem = async(expenseCategoryId,newExpense) =>{
            const docRef = doc(db,'expenses',expenseCategoryId)
            try{
            await updateDoc(docRef, {...newExpense})

            //Update State
            setExpenses(prevState => {
                const updateExpenses = [...prevState]

                const foundIndex = updateExpenses.find(expense =>{
                    return expense.id === expenseCategoryId
                })
                updateExpenses[foundIndex] = {id:expenseCategoryId, ...newExpense}

                return updateExpenses;
            })
            } catch(error){
                console.log(error.message)
            }
         }
        const addIncomeItem = async (newIncome) =>{
            const collectionRef = collection(db, 'income')

            try {
            const docSnap = await addDoc(collectionRef,newIncome)
    
            //update
    
            setIncome(prevState => {
                return(
                    [
                        ...prevState,
                        {
                            id:docSnap.id,
                            ...newIncome
                        }
                    ]
                )
            }) ;
            } catch (error) {
                console.log(error.message);
                throw error   
            }
        }
        const removeIncomeItem = async (incomeId) =>{
            const docRef = doc(db, 'income', incomeId);
            try {
              await deleteDoc(docRef);
              setIncome((prevState) => prevState.filter((i) => i.id !== incomeId));
            } catch (error) {
              console.error(error.message);
              throw error   
            }
        }
        const values = { Income,expenses,addIncomeItem,removeIncomeItem,addExpenseItem };

        useEffect(()=>{
            const getIncomeData = async () =>{
            const collectionRef = collection(db, 'income');
            const docsSnap = await getDocs(collectionRef);
    
            const data = docsSnap.docs.map(doc =>{
                return{
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis()),
                }
            })
            setIncome(data)
        };
        const getExpensesData = async() =>{
            const collectionRef = collection(db, 'expenses')
            const docsSnap = await getDocs(collectionRef)

            const data = docsSnap.docs.map((doc)=>{
                return {
                    id:doc.id,
                    ...doc.data()
                }
            });
            setExpenses(data)
        }
        getIncomeData();
        getExpensesData();
        },[])
    return <financeContext.Provider value={values}>
        {children}
    </financeContext.Provider>
}