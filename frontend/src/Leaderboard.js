import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { firestore } from './firebase';

const Leaderboard = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const gameResultsRef = collection(firestore, 'game_results');
  const q = query(
    gameResultsRef,
    where('timestamp', '>=', today),
    where('timestamp', '<', new Date(today.getTime() + 24 * 60 * 60 * 1000))
  );

  const [results, setResults] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const resultsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        userId: doc.id,
      }));
      setResults(resultsData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className='mt-3'>
        <h5>Results for today, {new Date().toLocaleDateString()}</h5>
        {results.map((result) => (
        <div key={result.userId}>
            {result.userId}: {result.input_value}
        </div>
        ))}
    </div>
  );
};

export default Leaderboard;
