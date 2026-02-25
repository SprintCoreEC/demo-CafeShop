import React from "react";
import CountUp from "react-countup";

const StatCard = ({ title, value, changePercent, icon: Icon, iconColor, view }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md space-y-2">
            <div className="flex justify-between items-center">
                <h2 className="text-title">{title}</h2>
                <Icon className={`text-2xl ${iconColor}`} />
            </div>
            <p className="text-4xl font-bold text-content">
                <CountUp
                    start={0}
                    end={value}
                    duration={2.5}
                    prefix={title === "Ingresos Totales" ? "$" : ""}
                />
            </p>
            <p className="text-content">
                {changePercent !== undefined ? (
                    <>
                        <CountUp
                            start={0}
                            end={changePercent}
                            duration={2.5}
                            decimals={1}
                            prefix={changePercent > 0 ? "+" : ""}
                        />
                        % respecto al {view === "monthly" ? "mes" : "día"} anterior
                    </>
                ) : (
                    "Sin historial de cambios"
                )}
            </p>
        </div>
    );
};


export default StatCard;