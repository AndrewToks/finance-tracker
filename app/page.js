'use client'
import { currencyFormatter } from '@/db/utils';
import ExpenseCategory from '@/components/ExpenseCategory';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import { useState,useRef, useEffect } from 'react';
import Modal from '@/components/Modal'


//Icons
import {FaRegTrashAlt} from 'react-icons/fa'
//Firebase

import {db} from '@/db/firebase'
import {collection,addDoc, getDocs, doc, deleteDoc} from 'firebase/firestore'
ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
    {
        id:1,
        title:'Entertainment',
        color:'#000',
        total:500
    },
    {
        id:2,
        title:'Gass',
        color:'#000',
        total:200
    },
    {
        id:3,
        title:'Fuel',
        color:'#040',
        total:1200
    },
    {
        id:4,
        title:'Movies',
        color:'#000',
        total:800
    },
    {
        id:5,
        title:'Holiday',
        color:'#000',
        total:2000
    },
]
export default function Home(){
    const [showAddIncomeModal,setShowAddIncomeModal] = useState(false);
    const [Income,setIncome] = useState([])
    console.log(Income);
    
    const amountRef = useRef()
    const descriptionRef = useRef()
    // Handler Functions

    const addIncomeHandler = async (e) =>{
        e.preventDefault();

        const newIncome = {
            amount : amountRef.current.value,
            description : descriptionRef.current.value,
            createdAt: new Date()
        }
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

        descriptionRef.current.value = ""
        amountRef.current.value = ""

        } catch (error) {
            console.log(error.message);   
        }
    }
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
    }
    getIncomeData();
    },[])

    const deleteIncomeEntryHandler = async (incomeId) => {
        const docRef = doc(db, 'income', incomeId);
        try {
          await deleteDoc(docRef);
          console.log(`Document with ID ${incomeId} deleted successfully.`);
          // Optionally update the state to remove the deleted item
          setIncome((prevState) => prevState.filter((i) => i.id !== incomeId));
        } catch (error) {
          console.error(`Error deleting document with ID ${incomeId}:`, error.message);
        }
      };
      
    return(
        <>
        {/*Add Income Modal */}
        <Modal show={showAddIncomeModal} onClose={setShowAddIncomeModal}>
            <form className='flex flex-col gap-4' onSubmit={addIncomeHandler}>
                <div className='input-group'>
                <label htmlFor="amount">Income Amount</label>
                <input name='amount' ref={amountRef} type="number" min={0.01} step={0.01} placeholder='Enter Income Amount' required/>
                </div>
                <div className='input-group'>
                <label htmlFor="amount">Description</label>
                <input name='description' ref={descriptionRef} type="text" placeholder='Enter Income Description' required/>
                </div>
               <button type='submit' className='btn btn-primary'>Add Entry</button>
            </form>


               <div className='flex flex-col gap-4 mt-6'>
                <h3 className='text-2xl font-bold'>Income History</h3>
                {Income.map(i =>{
                    return(
                        <div key={i.id} className='flex items-center justify-between'>
                            <div>
                                <p className='font-semibold'>{i.description}</p>
                                <small className='text-xs'>{i.createdAt.toISOString()}</small>
                            </div>
                            <p className='flex items-center gap-2'>{currencyFormatter(i.amount)}</p>
                            <button onClick={() => deleteIncomeEntryHandler(i.id)}><FaRegTrashAlt /></button>
                        </div>
                    )
                })}
               </div>
        </Modal>
        <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3 ">
            <small className="text-grey-400 text-md">My Balance</small>
            <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
            <button className="btn btn-primary">+ Expenses</button>
            <button onClick={()=>(setShowAddIncomeModal(true))} className="btn btn-primary-outline">+ Income</button>
        </section>

        {/* Expenses */}
        <section className='py-6'>
            <h3 className='text-2xl'>My Expenses</h3>
            <div className='flex flex-col gap-4 mt-6'>
                {DUMMY_DATA.map((expense) =>{
                    return(
                        <ExpenseCategory key={expense.id} color={expense.color} title={expense.title} total={expense.total} />
                    )
                })}
            </div>
        </section>

        {/* Chart Section */}
        <section className='py-6'>
            <h3 className='text-2xl'>Stats</h3>
            <div className='w-1/2 mx-auto'>
                <Doughnut data={{
                    labels:DUMMY_DATA.map((expense) => expense.title),
                    datasets: [
                        {
                            labels: 'Expenses',
                            data: DUMMY_DATA.map((expense) => expense.total),
                            backgroundColor:DUMMY_DATA.map((expense) => expense.color),
                            borderColor:['#10101b'],
                            borderWidth:5
                        },
                    ],
                }} />
            </div>
        </section>
        </main>
        </>
    )
}