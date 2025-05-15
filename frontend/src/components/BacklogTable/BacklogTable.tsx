import React from "react";
import { Box, Checkbox, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IonButton, IonCheckbox, IonIcon, IonInput } from "@ionic/react";
import { closeOutline } from "ionicons/icons";

interface GameInfo {
    id: number,
    title: string;
    platform: string;
    completed: boolean;
};

interface GameTableProps {
    games: GameInfo[];
    onToggleCompleted: (id: number) => void;
    onRemove: (id: number) => void;
}



const BacklogTable: React.FC<GameTableProps> = ({ games, onToggleCompleted, onRemove }) => {
    const columns: GridColDef[] = [
        {
            field: 'id', headerName: 'ID'
        },
        {
            field: 'title',
            headerName: 'Title'
        },
        {
            field: 'platform',
            headerName: 'Platform'
        },
        {
            field: 'completed',
            headerName: 'Completed',
            renderCell: (params) => (
                <Checkbox
                    checked={params.value}
                    onChange={() => onToggleCompleted(params.row.id)}
                    onClick={(e) => e.stopPropagation()}
                />
            )
        },
        {
            field: 'delete',
            headerName: 'Delete',
            renderCell: (params) => (
                <IconButton
                    color="error"
                    onClick={(e) => {
                            e.stopPropagation();
                            onRemove(params.row.id)}
                        }>
                            <IonIcon icon={closeOutline}/>
                </IconButton>
            )
        }
    ];
    if (games.length === 0) {
        return <h3>No games added yet...</h3>;
    }


    return (
        <Box sx={{width: '100%'}}>
            <DataGrid
                rows={games}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default BacklogTable;