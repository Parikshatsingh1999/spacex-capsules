import React, { useState, useEffect } from 'react'
import Filters from './Filters'
import Grid from './Grid';

export default function Main() {

    const [allItems, setAllItems] = useState([]);
    const [gridItems, setGridItems] = useState([]);
    const [gridFilters, setFilters] = useState({ status: null, original_launch: null, type: null });
    const [filtersSelected, setSelectedFilters] = useState({ status: null, original_launch: null, type: null });

    const fetchPost = async () => {
        const response = await fetch(
            "https://api.spacexdata.com/v3/capsules"
        );
        let data = await response.json();
        let result = data?.map(item => ({ name: item.details, id: item.capsule_serial, type: item.type, status: item.status, original_launch: item.original_launch, missions: item.missions, resuseCount: item.reuse_count, landings: item.landings }))
        let availStatus = [...new Set(data?.map(item => item.status))];
        let availLaunch = [...new Set(data?.map(item => item.original_launch))];
        let availType = [...new Set(data?.map(item => item.type))];
        setFilters({ status: availStatus, original_launch: availLaunch, type: availType });
        setAllItems(result);
        setGridItems(result);
    };

    const handleFilterChange = (name = "", value = "") => {
        if (!name || !value) return;
        let newFilters = { ...filtersSelected, [name]: value !== "null" ? value : null };
        setSelectedFilters(newFilters);
    }

    useEffect(() => {
        fetchPost();
    }, []);

    useEffect(() => {
        let items = allItems.filter(item => {
            let result = [filtersSelected.status !== null ? (item.status === filtersSelected.status ? true : false) : true,
            filtersSelected.original_launch !== null ? (item.original_launch === filtersSelected.original_launch ? true : false) : true,
            filtersSelected.type !== null ? (item.type === filtersSelected.type ? true : false) : true];
            return result.includes(false) ? false : true;
        });
        setGridItems(items);
    }, [filtersSelected, allItems]);


    return (
        <div className='main-container'>
            <h2 className='main-heading'> Space X: Capsules </h2>
            <div className='main-body-wrapper'>

                <div className='filter-form'>
                    <Filters filters={gridFilters} filterChanged={handleFilterChange} />
                </div>
                <div className='main-wrapper'>
                    <div className='main-grid'>
                        {
                            !gridItems.length && (
                                <div className='no-items'>
                                    <h4> Sorry ! Nothing Found </h4>
                                </div>
                            )
                        }
                        {
                            gridItems.length !== 0 && gridItems.map(item => (
                                <Grid key={item.id} gridItem={item} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
