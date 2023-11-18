import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Rooms = ({
    hotels,
    amountRooms,
    sethotels,
    setamountRooms,
}: {
    hotels: any;
    amountRooms: number;
    sethotels: any;
    setamountRooms: any;
}) => {
    const deleteRoom = (index: number) => {
        const hotel = hotels;
        delete hotel.rooms[index];

        hotel.rooms = hotel.rooms.filter((item: any) => {
            return item;
        });

        sethotels(hotel);

        setamountRooms(amountRooms - 1);
    };

    const renderRooms = () => {
        const rooms: any = [];

        for (let index = 0; index < amountRooms; index++) {
            rooms.push(
                <div className='border p-3' key={index}>
                    <div className='mb-2 border px-2 py-1'>
                        {typeof hotels?.rooms[index]?.isEnabled !=
                        'undefined' ? (
                            <Form.Check
                                type='switch'
                                id={`room_disable${index}`}
                                label='Disable this room'
                                name={`room[${index}][disable]`}
                                checked={!hotels?.rooms[index].isEnabled}
                                onChange={() =>
                                    sethotels({
                                        ...hotels,
                                        rooms: {
                                            ...hotels.rooms,
                                            [index]: {
                                                ...hotels.rooms[index],
                                                isEnabled:
                                                    !hotels?.rooms[index]
                                                        .isEnabled,
                                            },
                                        },
                                    })
                                }
                            />
                        ) : (
                            <Form.Check
                                type='switch'
                                id={`room_disable${index}`}
                                label='Disable this room'
                                name={`room[${index}][disable]`}
                            />
                        )}
                    </div>
                    <div className='search_group'>
                        <label htmlFor={`room_name${index}`}>Room name</label>
                        <input
                            type='text'
                            id={`room_name${index}`}
                            name={`room[${index}][name]`}
                            placeholder='Room name'
                            value={
                                (hotels?.rooms[index] &&
                                    hotels?.rooms[index].name) ||
                                ''
                            }
                            onChange={(e) =>
                                sethotels({
                                    ...hotels,
                                    rooms: {
                                        ...hotels.rooms,
                                        [index]: {
                                            ...hotels.rooms[index],
                                            name: e.target.value,
                                        },
                                    },
                                })
                            }
                            required
                        />
                    </div>
                    <div className='search_group'>
                        <label htmlFor={`room_type${index}`}>Type</label>
                        <input
                            type='text'
                            id={`room_type${index}`}
                            name={`room[${index}][type]`}
                            placeholder='Type'
                            value={
                                (hotels?.rooms[index] &&
                                    hotels?.rooms[index].type) ||
                                ''
                            }
                            onChange={(e) =>
                                sethotels({
                                    ...hotels,
                                    rooms: {
                                        ...hotels.rooms,
                                        [index]: {
                                            ...hotels.rooms[index],
                                            type: e.target.value,
                                        },
                                    },
                                })
                            }
                            required
                        />
                    </div>
                    <div className='search_group'>
                        <label htmlFor={`room_price${index}`}>Price</label>
                        <input
                            type='number'
                            id={`room_price${index}`}
                            name={`room[${index}][price]`}
                            placeholder='Price'
                            value={
                                (hotels?.rooms[index] &&
                                    hotels?.rooms[index].price) ||
                                ''
                            }
                            onChange={(e) =>
                                sethotels({
                                    ...hotels,
                                    rooms: {
                                        ...hotels.rooms,
                                        [index]: {
                                            ...hotels.rooms[index],
                                            price: e.target.value,
                                        },
                                    },
                                })
                            }
                            required
                        />
                    </div>
                    <div className='search_group'>
                        <label htmlFor={`room_tax${index}`}>Tax</label>
                        <input
                            type='number'
                            id={`room_tax${index}`}
                            name={`room[${index}][tax]`}
                            placeholder='Tax'
                            value={
                                (hotels?.rooms[index] &&
                                    hotels?.rooms[index].tax) ||
                                ''
                            }
                            onChange={(e) =>
                                sethotels({
                                    ...hotels,
                                    rooms: {
                                        ...hotels.rooms,
                                        [index]: {
                                            ...hotels.rooms[index],
                                            tax: e.target.value,
                                        },
                                    },
                                })
                            }
                            required
                        />
                    </div>
                    <div className='d-flex gap-3 justify-content-center mt-3'>
                        <Button
                            variant='danger'
                            onClick={() => deleteRoom(index)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div className='d-flex gap-3 flex-wrap justify-content-center mb-4'>
                {rooms}
            </div>
        );
    };

    return <>{renderRooms()}</>;
};

export default Rooms;
