import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const AuditLog = sequelize.define('AuditLog', {
    event_type: { type: DataTypes.STRING, allowNull: false },
    payload: { type: DataTypes.JSONB, allowNull: false },
    service_name: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'audit_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

export default AuditLog;
